// infinite-scroll.js

document.addEventListener('DOMContentLoaded', () => {
  const trigger = document.getElementById('infinite-scroll-trigger');
  const listContainer = document.querySelector('.list-items');
  let nextPageLink = document.getElementById('next-page-link');
  let loading = false;

  if (!trigger) {
    return; // No trigger found, do nothing.
  }

  const loadNextPage = async () => {
    if (loading || !nextPageLink) return;

    loading = true;
    try {
      const response = await fetch(nextPageLink.href);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');

      const newItems = doc.querySelectorAll('.list-items > *');
      newItems.forEach(item => {
        listContainer.appendChild(item);
      });

      const newNextPageLink = doc.getElementById('next-page-link');
      if (newNextPageLink) {
        nextPageLink.href = newNextPageLink.href;
      } else {
        trigger.remove();
        nextPageLink.remove();
        observer.disconnect();
        nextPageLink = null;
      }
    } catch (error) {
      console.error('Failed to fetch next page:', error);
    } finally {
      loading = false;
    }
  };

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadNextPage();
    }
  }, { rootMargin: '0px 0px 300px 0px' });

  observer.observe(trigger);
});
