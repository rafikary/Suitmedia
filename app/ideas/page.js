'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import PostCard from '../components/PostCard';
import Pagination from '../components/Pagination';
import usePersistentState from '../../hooks/usePersistentState';
import styles from './styles.module.css';

export default function IdeasPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Gunakan hook kustom untuk state yang persisten
  const [currentPage, setCurrentPage] = usePersistentState('ideas_currentPage', 1);
  const [itemsPerPage, setItemsPerPage] = usePersistentState('ideas_itemsPerPage', 10);
  const [sortBy, setSortBy] = usePersistentState('ideas_sortBy', '-published_at');

  const fetchIdeas = useCallback(async () => {
    setIsLoading(true);
    
    // Bangun URL dengan parameter
  // Kode Baru (Benar)
const params = new URLSearchParams({
  'page[number]': currentPage,
  'page[size]': itemsPerPage,
  'sort': sortBy,
});
// Kirim parameter append satu per satu
params.append('append[]', 'small_image');
params.append('append[]', 'medium_image');

    try {
      // Panggil proxy API kita, bukan API eksternal langsung
      const response = await fetch(`/api/ideas?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      
      setPosts(data.data);
      setTotalItems(data.meta.total);
      setTotalPages(data.meta.last_page);

    } catch (error) {
      console.error("Failed to fetch ideas:", error);
      // Mungkin bisa ditambahkan state untuk menampilkan pesan error di UI
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, itemsPerPage, sortBy]);

  useEffect(() => {
    fetchIdeas();
  }, [fetchIdeas]);

  // Handler untuk mengubah state
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset ke halaman 1 saat item per page diubah
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset ke halaman 1 saat sort diubah
  };

  // Kalkulasi untuk "Showing X - Y of Z"
  const firstItemIndex = (currentPage - 1) * itemsPerPage + 1;
  const lastItemIndex = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <>
      <Header />
      <main>
        <Banner />
        <div className={styles.container}>
          <div className={styles.controls}>
            <p>Showing {firstItemIndex} - {lastItemIndex} of {totalItems}</p>
            <div className={styles.filters}>
              <label>
                Show per page:
                <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </label>
              <label>
                Sort by:
                <select value={sortBy} onChange={handleSortByChange}>
                  <option value="-published_at">Newest</option>
                  <option value="published_at">Oldest</option>
                </select>
              </label>
            </div>
          </div>

          {isLoading ? (
            <div className={styles.grid}>
              {/* Skeleton Loading */}
              {Array.from({ length: itemsPerPage }).map((_, index) => (
                <div key={index} className={`${styles.card} ${styles.skeleton}`}>
                  <div className={styles.skeletonImage}></div>
                  <div className={styles.skeletonText}></div>
                  <div className={styles.skeletonText}></div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {!isLoading && posts.length === 0 && (
             <p className={styles.noResults}>No ideas found.</p>
          )}

          {!isLoading && totalPages > 1 && (
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </main>
    </>
  );
}