export const handleDownload = (items: any[]) => {
  const jsonString = JSON.stringify(
    items.map((item: any) => {
      delete (item as any).image;
      return item;
    }),
    null,
    2
  );
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
