import styles from '../ideas/styles.module.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
};

export default function PostCard({ post }) {
  const imageUrl = post?.small_image?.url 
    ? post.small_image.url 
    : 'https://via.placeholder.com/400x300.png?text=NO+IMAGE';

  console.log("Full post object:", post);
  console.log("Image URL:", imageUrl);

  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <img
          src={imageUrl}
          alt={post.title || 'No title'}
          className={styles.cardImageTag}
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300.png?text=INVALID+IMAGE';
          }}
        />
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardDate}>{formatDate(post.published_at)}</p>
        <h3 className={styles.cardTitle}>{post.title}</h3>
      </div>
    </div>
  );
}
