document.getElementById('filter').addEventListener('click', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const language =
    urlParams.get('language') || document.getElementById('language').value;
  const tags =
    urlParams.get('tags')?.split(',') ||
    Array.from(document.querySelectorAll('input[name="tags"]:checked')).map(
      (cb) => cb.value
    );

  const rows = document.querySelectorAll('#snippetTable tbody tr');
  const visibleTags = new Set();

  rows.forEach((row) => {
    const languageMatches = !language || row.dataset.language === language;
    const tagsMatch = tags.every((tag) => row.dataset.tags.includes(tag));
    row.style.display = languageMatches && tagsMatch ? '' : 'none';

    if (row.style.display !== 'none') {
      row.dataset.tags.split(' ').forEach((tag) => visibleTags.add(tag));
    }
  });

  const tagsFieldset = document.getElementById('tags');
  const legend = tagsFieldset.querySelector('legend');
  tagsFieldset.innerHTML = legend ? legend.outerHTML : '';

  Array.from(visibleTags).forEach((tag, i) => {
    tagsFieldset.insertAdjacentHTML(
      'beforeend',
      `
      <input type="checkbox" id="tag${i}" name="tags" value="${tag}" ${
        tags.includes(tag) ? 'checked' : ''
      }>
      <label for="tag${i}">${tag}</label>
    `
    );
  });
});
