interface FocusedPost {
  image: string;
}

export const MainImage = ({
  focusedPost,
}: {
  focusedPost: FocusedPost | undefined;
}) => {
  return (
    <div className="flex-1 h-full">
      {focusedPost !== undefined ? (
        <img
          src={focusedPost.image}
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "auto",
            maxWidth: "auto",
            objectFit: "contain",
          }}
        />
      ) : (
        <p>No image selected</p>
      )}
    </div>
  );
};
