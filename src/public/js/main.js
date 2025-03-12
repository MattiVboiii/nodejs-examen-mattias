document.getElementById('filter').addEventListener('click', function () {
  const selectedLanguage = document.getElementById('language').value;
  const selectedTags = Array.from(
    document.querySelectorAll('input[name="tags"]:checked')
  ).map((cb) => cb.value);
  const rows = document.querySelectorAll('#snippetTable tbody tr');

  rows.forEach((row) => {
    const rowLanguage = row.getAttribute('data-language');
    const rowTags = row.getAttribute('data-tags').split(' ');
    const languageMatches =
      !selectedLanguage || rowLanguage === selectedLanguage;
    const tagsMatch = selectedTags.every((tag) => rowTags.includes(tag));

    if (languageMatches && tagsMatch) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});
