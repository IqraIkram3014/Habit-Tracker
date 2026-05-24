# ANSWERS

## 1. How to run

### Run locally

1. Download or clone the repository

```bash
git clone https://github.com/IqraIkram3014/Habit-Tracker.git
```

2. Open the project folder in VS Code

3. Install the Live Server extension

4. Right click on `index.html`

5. Click "Open with Live Server"

### Technologies Used

- HTML
- CSS
- JavaScript

### Deployment

GitHub Repository:
https://github.com/IqraIkram3014/Habit-Tracker


---

## 2. Stack & design choices

I used vanilla HTML, CSS, and JavaScript because it is lightweight, simple to maintain, and suitable for a small frontend-only application without requiring any framework setup.

### Design Decision 1

I used a weekly grid layout instead of a list layout because users can quickly scan their habit completion history for the entire week in a single glance.

### Design Decision 2

I highlighted the current day column using a soft green background so users can immediately identify today's progress without searching through the grid.


---

## 3. Responsive & accessibility

### Responsive Behavior

On mobile screens around 360px wide, the table becomes horizontally scrollable so the layout remains usable without breaking.

On larger laptop screens around 1440px wide, the table expands fully and uses spacing to improve readability.

### Accessibility Consideration Implemented

I used clear button styles and hover states to improve visibility and interaction feedback for users.

### Accessibility Consideration Skipped

I did not fully implement advanced keyboard navigation for all interactive cells because of time limitations.


---

## 4. AI usage

I used ChatGPT for:

- UI layout ideas
- CSS styling improvements
- JavaScript logic guidance
- Improving the edit and delete button design
- Responsive layout suggestions

### Change Made to AI Output

The AI initially suggested simple emoji buttons for edit and delete actions. I replaced them with Font Awesome icons and added hover animations and colored backgrounds to make the interface look more professional and visually clear.


---

## 5. Honest gap

One area that could be improved is the streak calculation logic and overall animations.

With more time, I would improve the streak system to support more advanced tracking behavior and add smoother animations and transitions for habit interactions.