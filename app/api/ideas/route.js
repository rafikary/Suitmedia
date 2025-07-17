import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = `https://suitmedia-backend.suitdev.com/api/ideas?${searchParams.toString()}`;

  // Log URL yang dituju untuk debugging
  console.log(`Proxying request to: ${targetUrl}`);

  try {
    const res = await fetch(targetUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // Menambahkan timeout untuk mencegah hang (opsional tapi bagus)
      signal: AbortSignal.timeout(10000), // timeout 10 detik
    });

    if (!res.ok) {
      // Jika respons dari API eksternal tidak ok, log statusnya
      console.error(`External API Error: Status ${res.status} ${res.statusText}`);
      const errorData = await res.text(); // Gunakan .text() agar tidak error jika respons bukan JSON
      console.error('External API Response Body:', errorData);
      return NextResponse.json(
        { message: `Error from external API: ${res.statusText}`, details: errorData },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
    
  } catch (error) {
    // Jika fetch gagal (misal: tidak ada internet, DNS, timeout)
    console.error('Proxy Fetch Error:', error);
    return NextResponse.json(
        { message: 'Failed to fetch from external API.', error: error.message },
        { status: 502 } // 502 Bad Gateway lebih cocok untuk error proxy
    );
  }
}