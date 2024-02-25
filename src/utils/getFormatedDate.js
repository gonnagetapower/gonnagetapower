export const getFormatedDate = () => {
    let date = new Date();
    let dd = date.getDate().toString();
    let mm = (date.getMonth() + 1).toString();
    let yy = date.getFullYear().toString();
    if (mm.length < 2) {
        mm = "0" + mm;
    }
    return yy + mm + dd;
}