export default function startRating(rating){
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5; // Kiểm tra phần thập phân của rating
    return (
        <div>
      {/* Hiển thị các ngôi sao đầy đủ */}
      {[...Array(fullStars)].map((_, index) => (
        <span key={index} style={{ color: 'gold' }}>★</span>
      ))}

      {/* Hiển thị ngôi sao một phần nếu có */}
      {hasHalfStar && <span style={{ color: 'gold' }}>☆</span>}

      {/* Hiển thị các ngôi sao rỗng còn lại */}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
        <span key={index} style={{ color: 'gray' }}>☆</span>
      ))}
    </div>
    )
}