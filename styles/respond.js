export default function respond(type, content) {
    if (type === "xs") {
        return `@media only screen and (max-width: 319px){
    ${content}
  }`;
    } else if (type === "s") {
        return `@media only screen and (min-width: 539px){
    ${content}
  }`;
    } else if (type === "m") {
        return `@media only screen and (min-width: 768px){
    ${content}
  }`;
    } else if (type === "l") {
        return `@media only screen and (min-width: 992px){
    ${content}
  }`;
    } else if (type === "xl") {
        return `@media only screen and (min-width: 1255px){
    ${content}
  }`;
    } else if (type === "xxl") {
        return `@media only screen and (min-width: 1662px){
    ${content}
  }`;
    } else if (type === "tv") {
        return `@media only screen and (min-width: 2561px){
    ${content}
  }`;
    }
}
