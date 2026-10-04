# Sanskruti Dhanani — Portfolio

Static HTML/CSS/JavaScript portfolio for `sanskrutidhanani.dev`.

## Files

- `index.html` — home page, skills, about section, and email
- `projects.html` — clean public project archive
- `admin.html` — unlinked local project editor for adding/deleting/exporting projects
- `styles.css` — responsive visual system
- `script.js` — project data, local browser storage, delete, and JSON export

## Important project-editor note

The public project page contains no management controls. The unlinked `admin.html` page is a client-side editor for adding, deleting, and exporting projects. Changes are saved in the browser with `localStorage`; visitors cannot see the editor through the public navigation, but this is not authentication.

When a project is ready to publish, click **Export projects.json**, replace the starter project data in `script.js`, and commit the change to GitHub. A later version can use Cloudflare Workers + D1 if you want a real authenticated editor that updates the public site globally.

## Cloudflare Pages deployment

1. Create a GitHub repository named `sanskruti-portfolio`.
2. Upload these files to the repository.
3. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
4. Select the repository. Use no build command and leave the output directory as `/`.
5. Deploy, then open the project’s **Custom domains** settings and add `sanskrutidhanani.dev`.
6. Add your résumé PDF later as `assets/resume.pdf` and replace the contact/resume link when ready.

## Before publishing

- Replace the placeholder contact email if needed.
- Add your GitHub and LinkedIn links.
- Add a project when you have a real implementation, test, measurement, or lesson to show.
- Add screenshots, architecture diagrams, tests, measurements, and failure notes to projects as evidence becomes available.
