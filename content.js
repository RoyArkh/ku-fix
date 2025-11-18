function handleLinkClick(event) {
  const a = event.target.closest('a');
  if (!a || !a.href) return;

  let href = a.href;

  // Only care about ceratin links
  if (!href.includes('forcedownload=')) return;

  try {
    const url = new URL(href, window.location.href);
    const forced = url.searchParams.get('forcedownload');

    if (forced === '1') {
      // change
      url.searchParams.set('forcedownload', '0');
      const newHref = url.toString();

      event.preventDefault();

      const isMiddleClick = event.button === 1;
      const openInNewTab =
        isMiddleClick ||
        event.ctrlKey ||
        event.metaKey ||
        a.target === '_blank';

      if (openInNewTab) {
        window.open(newHref, '_blank');
      } else {
        window.location.href = newHref;
      }
    }
  } catch (e) {
    // If URL parsing fails, just do nothing
  }
}

document.addEventListener('click', handleLinkClick, true);

document.addEventListener('auxclick', function (event) {
  if (event.button === 1) {
    handleLinkClick(event);
  }
}, true);
