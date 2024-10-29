interface FocusedPost {
  imageBase64: string;
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
          src={`data:image/jpg;base64,${focusedPost.imageBase64}`}
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
