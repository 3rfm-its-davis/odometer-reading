export const handleDownload = (items: any[], type: string = "json") => {
  let blob;
  let url;
  let a;

  if (type === "json") {
    const jsonString = JSON.stringify(
      items.map((item: any) => {
        delete (item as any).image;
        return item;
      }),
      null,
      2
    );
    blob = new Blob([jsonString], { type: "application/json" });
  } else {
    const keys = Object.keys(items[0]);
    const csv = items.map((row) => {
      return keys
        .map((key) => {
          return JSON.stringify(row[key]);
        })
        .join(",");
    });
    csv.unshift(keys.join(","));
    const csvString = csv.join("\r\n");
    blob = new Blob([csvString], { type: "text/csv" });
  }
  url = URL.createObjectURL(blob);
  a = document.createElement("a");

  a.href = url;
  a.download = `${new Date().toLocaleDateString()}.${type}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
