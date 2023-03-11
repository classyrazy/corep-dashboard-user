function generateColorCode(courseName, format = 'hex') {
    let hash = 0;
    for (let i = 0; i < courseName.length; i++) {
      hash = courseName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hex = Math.abs(hash).toString(16).substring(0, 6);
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    if (brightness < 128) {
      // if color is too dark, make it lighter
      const lightness = Math.min(100, brightness + 80);
      if (format === 'rgb') {
        return `rgb(${r}, ${g}, ${b})`;
      } else if (format === 'hsl') {
        return `hsl(${r}, ${g}%, ${lightness}%)`;
      } else {
        return `#${hex}`;
      }
    } else {
      // if color is too bright, make it darker
      const darkness = Math.max(0, brightness - 50);
      if (format === 'rgb') {
        return `rgb(${r}, ${g}, ${b})`;
      } else if (format === 'hsl') {
        return `hsl(${r}, ${g}%, ${darkness}%)`;
      } else {
        return `#${hex}`;
      }
    }
  }
  