// import Image from 'next/image'; // Baris ini tidak lagi diperlukan
import styles from '../ideas/styles.module.css';

// Fungsi untuk format tanggal
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function PostCard({ post }) {
  const imageUrl = post.small_image?.[0]?.url || 'https://via.placeholder.com/400x300.png?text=No+Image';

  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        {/* Menggunakan tag <img> biasa untuk memastikan gambar muncul */}
        <img
          src={imageUrl}
          alt={post.title}
          className={styles.cardImageTag}
          loading="lazy"
        />
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardDate}>{formatDate(post.published_at)}</p>
        <h3 className={styles.cardTitle}>{post.title}</h3>
      </div>
    </div>
  );
}