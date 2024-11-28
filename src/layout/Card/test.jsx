const cardsData = [
    {
      thumbnailSrc:
        "https://scontent-ssn1-1.cdninstagram.com/v/t51.2885-15/325297939_561444449222601_9023434041710752547_n.jpg?stp=dst-jpg_e35&_nc_ht=scontent-ssn1-1.cdninstagram.com&_nc_cat=109&_nc_ohc=3AKu5Xy2nzoAX9tUXwM&edm=AGyKU4gBAAAA&ccb=7-5&ig_cache_key=MzAxNTkzMjM4ODY3NjQxNzk5MA%3D%3D.2-ccb7-5&oh=00_AfAw4vKNbe2LOy1PKSjJPiaCQ8bYTp21UWkfcQi0lT0kJQ&oe=63CA46A9&_nc_sid=4cb768",
      headerTitle: "제목 고냥이",
      headerSubtitle: "부제목 고냥이",
      postLiked: false,
      comments: [],
      postLikes: 174,
      scrollViewItems: {
        url: "https://img.danawa.com/prod_img/500000/279/192/img/14192279_1.jpg?shrink=330:330&_v=20210518140020",
      },
    },
  ];
  
  const App = () => {
    const [cards, setCards] = React.useState(cardsData);
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {cards.map((card, index) => (
          <div key={index}>
            <Card
              style={{
                width: 260,
                boxShadow: "0 0 4px 0 rgba(0, 0, 0, .1)",
                marginTop: "15px",
              }}
            >
              <CardHeader
                className="k-hbox"
                style={{
                  background: "transparent",
                }}
              >
                <div>
                  <CardTitle
                    style={{
                      marginBottom: "4px",
                    }}
                  >
                    {card.headerTitle}
                  </CardTitle>
                  <CardSubtitle>
                    <p>{card.headerSubtitle}</p>
                  </CardSubtitle>
                </div>
              </CardHeader>
              <CardImage
                src={card.scrollViewItems.url}
                style={{
                  height: "185px",
                  maxWidth: "100%",
                }} />
              <CardActions
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <button
                    className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
                  >
                    <span
                      className={card.postLiked
                        ? "k-icon k-i-heart"
                        : "k-icon k-i-heart-outline"} />
                  </button>
                  <button
                    className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base"
                  >
                    <span className="k-icon k-i-comment" />
                  </button>
                  <button className="k-button k-button-md k-rounded-md k-button-flat k-button-flat-base">
                    <span className="k-icon k-i-share" />
                  </button>
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    alignSelf: "center",
                    color: "#656565",
                  }}
                >
                  {card.postLikes} likes
                </span>
              </CardActions>
            </Card>
          </div>
        ))}
      </div>
    );
  };