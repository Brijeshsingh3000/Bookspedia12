

const mySeries = [
    "https://i.pinimg.com/736x/34/04/b4/3404b4ce2b34cf48adf9cfce4dba1078.jpg",
    "https://i.pinimg.com/originals/7d/4b/bc/7d4bbcda5f8a7d4afce73514c445caf2.jpg",
    "https://eachpage.org/wp-content/uploads/2018/02/books-catching-fire-mockingjay-the-hunger-games.jpg"
]
const Series = () => {
    return (
        <div className="series-book-container">
            <h3>Top Book Series</h3>
            <div className="series-book-content">
                {
                    mySeries.map((items, index) => (
                        <div className="series-book-img" key={index}>
                            <img src={items} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Series;