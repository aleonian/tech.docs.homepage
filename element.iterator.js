function extractMarkdownBodyData() {
  // Get all elements with the class 'markdown-body'
  const markdownBodies = document.querySelectorAll('.markdown-body');
  const items = [];

  // Iterate over each markdown body element
  markdownBodies.forEach(body => {
    // Check if the element contains any H3 children
    const h3Elements = body.querySelectorAll('h3');
    if (h3Elements.length === 0) {
      return; // Skip if there are no H3 elements
    }

    // Iterate over each H3 element
    h3Elements.forEach(h3 => {
      const item = { title: h3.textContent, links: [] };

      // Find the next UL sibling of the H3 element
      let nextElement = h3.nextElementSibling;
      while (nextElement && nextElement.tagName !== 'UL') {
        nextElement = nextElement.nextElementSibling;
      }

      if (nextElement && nextElement.tagName === 'UL') {
        // Iterate over each LI element within the UL
        const liElements = nextElement.querySelectorAll('li');
        liElements.forEach(li => {
          const aElement = li.querySelector('a');
          if (aElement) {
            item.links.push({ url: aElement.href, linkText: aElement.textContent });
          }
        });
      }

      // Store the item object in the items array
      items.push(item);
    });
  });

  return items;
}

// Example usage:
const extractedItems = extractMarkdownBodyData();
console.log(extractedItems);
