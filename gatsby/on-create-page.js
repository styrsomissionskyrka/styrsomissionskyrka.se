/**
 * Modify certain pages and add some context to statefully created pages
 *
 * @param {import('gatsby').CreatePageArgs} args
 * @returns {void}
 */
export const onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  /**
   * This will add a $today param to all queries created statically (meaning
   * all queries made in files inside `src/pages`).
   */
  if (page.isCreatedByStatefulCreatePages) {
    const today = Date.now();
    deletePage(page);
    createPage({
      ...page,
      context: { today, ...page.context },
    });
  }
};
