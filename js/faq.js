const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

  item
    .querySelector(".faq-question")
    .addEventListener("click", () => {

      const isOpen =
        item.classList.contains("active");

      faqItems.forEach(faq => {
        faq.classList.remove("active");
      });

      if(!isOpen){
        item.classList.add("active");
      }
  });

});