# ReviewHub corrected flow

This version follows the intended flow from the wireframe:

1. `index.html` - Welcome page only
2. `school-search.html` - Pick/search your interested school
3. `school-results.html` - Choose one school match
4. `choose-action.html` - Choose rate or check
5. `choose-rate.html` / `choose-check.html` - Choose professor or programme
6. `professors.html` / `programmes.html` - Search and matching results
7. `professor-detail.html` / `programme-detail.html` - Rating detail pages
8. `rate-professor.html` / `rate-programme.html` - Separate rating forms
9. `register.html` - Different registration attributes for school, professor, and programme
10. `contact.html` - Contact form, imprint, and image sources


## Submission behaviour

This is still a static website, so there is no real backend database. For the prototype, submit buttons redirect to `submitted.html`, and professor/programme reviews are saved in browser localStorage and shown on the corresponding detail page in the same browser.

## Keyboard and search fixes

- `school-search.html`: pressing Enter in the school input now submits the form and opens `school-results.html`.
- `professors.html` and `programmes.html`: pressing Enter now reveals matching results, same as clicking Search.
- Added visible `:focus-visible` styling for Tab navigation across links, buttons, inputs, cards, and tabs.
- Register page tabs now use the project colour palette instead of the default blue Bootstrap active style.
