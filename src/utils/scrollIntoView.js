const scrollIntoView = (element) => {
  element.scrollIntoView({
    behavior: "smooth",
    block: "end",
    inline: "nearest"
  });
};

export default scrollIntoView