export const sanitize = (data: string) => {
  // <, >, &, ', " and /
  // let sanitized = decodeURI(data);
  
  return data.replace(/[<>&'"|]/g, "")
}