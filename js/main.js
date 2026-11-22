
(async () => {
  const host = document.querySelector('#cards');
  if (!host) return;

  const search = document.querySelector('#search');
  const empty = document.querySelector('#empty');

  try {
    const response = await fetch('/posts.json', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Could not load posts');
    }

    const posts = await response.json();

    posts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    function render() {
      const q = (search?.value || '')
        .toLowerCase()
        .trim();

      const isHome =
        location.pathname === '/' ||
        location.pathname.endsWith('/index.html');

      const filtered = posts
        .filter(p => {
          const text = [
            p.title,
            p.category,
            p.description
          ].filter(Boolean).join(' ').toLowerCase();

          return text.includes(q);
        })
        .slice(0, isHome && !q ? 15 : undefined);

      host.replaceChildren();

      for (const p of filtered) {
        const card = document.createElement('article');
        card.className = 'card';

        if (p.image) {
          const img = document.createElement('img');
          img.src = p.image;
          img.alt = p.title + ' cover';
          img.loading = 'lazy';

          img.onerror = () => {
            img.remove();

            const placeholder =
              document.createElement('div');

            placeholder.className = 'placeholder';
            placeholder.textContent = '♛';

            card.prepend(placeholder);
          };

          card.append(img);
        } else {
          const placeholder =
            document.createElement('div');

          placeholder.className = 'placeholder';
          placeholder.textContent = '♛';

          card.append(placeholder);
        }

        const title = document.createElement('h3');
        title.textContent = p.title;

        const cat = document.createElement('p');
        cat.textContent = p.category || 'Game Review';

        const actions = document.createElement('div');
        actions.className = 'card-actions';

        const download = document.createElement(
          p.downloadUrl ? 'a' : 'span'
        );

        download.className =
          'card-download' +
          (p.downloadUrl ? '' : ' is-disabled');

        download.textContent = '⬇ Download';

        if (p.downloadUrl) {
          download.href = p.downloadUrl;
          download.target = '_blank';
          download.rel =
            'nofollow sponsored noopener noreferrer';

          download.setAttribute(
            'aria-label',
            'Visit external link for ' + p.title
          );
        } else {
          download.title = 'Download link coming soon';
          download.setAttribute(
            'aria-disabled',
            'true'
          );
        }

        const info = document.createElement('a');
        info.href = p.url;
        info.className = 'card-info';
        info.textContent = 'View Information →';

        actions.append(download, info);
        card.append(title, cat, actions);
        host.append(card);
      }

      if (empty) {
        empty.hidden = filtered.length !== 0;

        if (!filtered.length) {
          empty.textContent = 'No games found.';
        }
      }
    }

    search?.addEventListener('input', render);

    render();

  } catch (error) {
    console.error('Game cards error:', error);

    if (empty) {
      empty.hidden = false;
      empty.textContent =
        'Posts could not be loaded. Please try again later.';
    }
  }
})();
