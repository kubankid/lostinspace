# BlackJack Pit - Update Walkthrough

## Changes Implemented

### 1. Rebet Feature Fix
- **Issue**: The "Change Bet" controls were being obscured by the main game controls, making it impossible to adjust bets when low on chips.
- **Fix**: Moved the `BettingControls` component inside the main `Controls` bar.
- **Result**: Betting controls are now always visible next to the "Deal New Hand" button.

### 2. Layout Refinements
- **Issue**: The game table was cut off, and the status panel looked squished.
- **Fix**:
  - Increased the height of the center screen (Game Board) to `700px`.
  - Increased the width of the right screen (Status Panel) to `500px`.
  - Optimized CSS for `.game-board` and `.status-panel` to be more flexible.
  - Moved the side screens (Shop and Status) further out in the 3D room (X-axis distance increased from 12 to 14).
  - **Update**: Moved the Shop (Left Screen) to X=-12 to find the sweet spot between "too far" and "too close".

### 3. Camera Adjustments
- **Issue**: The view was too close, the angle needed adjustment, and the scene was off-center.
- **Fix**:
  - Zoomed out the camera to a distance of `32`.
  - Raised the camera height (Y-axis) to `2.5` to provide a better viewing angle.
  - Shifted the camera and orbit target X-axis to `2` to center the scene.

### 4. Application Packaging
- **Feature**: User requested a standalone app.
- **Implementation**:
  - Configured `electron-builder` in `package.json`.
  - Updated `electron/main.js` to correctly load production assets.
  - Updated `vite.config.js` to use relative paths (`base: './'`) for assets.
  - Generated a macOS application bundle (`.app`) and disk image (`.dmg`).

### 5. 8-bit Card Visuals
- **Feature**: Replaced CSS-based cards with 8-bit image assets.
- **Implementation**:
  - Copied `tileXXX.png` images to `public/cards/`.
  - Updated `Card.jsx` to render images based on suit and rank mapping.
  - Updated `App.jsx` to use the 8-bit card back (`tile052.png`) for the dealer's hole card.

## Verification

- **Build Status**: The application was successfully built using `npm run dist`.
- **Location**: The packaged app is located at `BlackJack Pit/release/mac-arm64/BlackJack Pit.app`.
- **Functionality**: The app should now launch directly from the Dock with all layout, camera, and visual updates applied.
