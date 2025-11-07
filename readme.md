# Akiba 💰

A family-friendly financial literacy web application that teaches budgeting, saving, and money management skills through interactive tools and engaging educational content.

## 🌟 Features

### 📊 Smart Budget Tracking
- Visual monthly budget management
- Real-time expense tracking
- Interactive progress indicators
- Spending categorization with colorful visuals

### 💸 Expense Management
- Easy expense logging with categories
- Spending history with visual charts
- Expense analysis by category
- One-click expense deletion

### 🎯 Savings Goals
- Custom savings goal creation
- Progress tracking with visual indicators
- Goal completion celebrations
- Flexible goal management

### 📚 Financial Education
- Age-appropriate money lessons
- Interactive quizzes with instant feedback
- Practical financial tips and guidance
- Needs vs. wants education

### 👨‍👩‍👧‍👦 Family-Friendly Design
- Simple, intuitive interface
- Engaging visuals and animations
- Mobile-responsive design
- Safe, judgment-free environment

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/money-master.git
```

2. Navigate to the project directory:
```bash
cd money-master
```

3. Open `index.html` in your web browser:
```bash
# On macOS
open index.html

# On Windows
start index.html

# On Linux
xdg-open index.html
```

Alternatively, you can serve the files using a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 📁 Project Structure

```Akiba/
├── index.html          # Main application file
├── styles.css          # All styling and responsive design
├── script.js           # Application logic and functionality
├── README.md           # Project documentation
└── assets/             # Additional resources (images, icons, etc.)
    ├── images/
    └── icons/
```

## 🎯 How to Use

### Setting Up Your Budget
1. Click on the "📊 My Budget" tab
2. Enter your monthly income in the input field
3. Watch the budget summary update in real-time
4. Monitor your budget health with the progress indicator

### Tracking Expenses
1. Navigate to "💸 Track Spending" tab
2. Fill in expense details:
   - What you bought
   - How much it cost
   - Expense category
3. Click "Add Expense" to save
4. View your spending history below

### Creating Savings Goals
1. Go to "🎯 Savings Goals" tab
2. Set up your goal:
   - What you're saving for
   - Target amount
   - Current savings
3. Track progress with visual indicators

### Learning About Money
1. Visit "📚 Money Lessons" tab
2. Read through interactive lessons:
   - Understanding Money
   - Needs vs. Wants
   - Power of Saving
   - Budgeting Basics
   - Making Money Grow
   - Avoiding Money Traps

### Testing Your Knowledge
1. Click "🎮 Money Quiz" tab
2. Answer interactive questions
3. Get instant feedback and explanations
4. Track your score and improve

## 💾 Data Storage

Money Master uses **localStorage** to save your data locally in the browser. This means:
- Your budget, expenses, and goals are saved automatically
- Data persists between browser sessions
- No account creation or login required
- Complete privacy - your data stays on your device

## 🎨 Customization

### Adding New Expense Categories
Edit the `expenseCategories` object in `script.js`:

```javascript
const expenseCategories = {
    your_new_category: {
        icon: '🎨',
        color: '#your_hex_color',
        name: 'Your Category Name'
    }
    // ... existing categories
};
```

### Modifying Quiz Questions
Update the `quizQuestions` array in `script.js`:

```javascript
const quizQuestions = [
    {
        question: "Your new question?",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correct: 0, // Index of correct answer
        explanation: "Explanation for the answer"
    }
    // ... existing questions
];
```

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

### Built With
- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with Flexbox/Grid and animations
- **Vanilla JavaScript** - No frameworks for fast loading
- **localStorage API** - Client-side data persistence
- **Progressive Web App** - Works offline-capable

### Key JavaScript Features
- ES6+ syntax (arrow functions, template literals, destructuring)
- Array methods (map, filter, reduce)
- Local Storage for data persistence
- DOM manipulation without jQuery
- Event delegation for performance

## 🌈 Color Scheme

| Purpose | Color | Hex |
|---------|-------|-----|
| Primary | Purple Gradient | `#667eea` to `#764ba2` |
| Success | Green | `#28a745` |
| Warning | Yellow | `#ffc107` |
| Danger | Red | `#dc3545` |
| Background | Light Gray | `#f8f9fa` |

## 📊 Future Enhancements

- [ ] User accounts and cloud sync
- [ ] Advanced charts and analytics
- [ ] Recurring expenses and bills
- [ ] Export data to CSV/PDF
- [ ] Multi-currency support
- [ ] Family sharing features
- [ ] Mobile app versions
- [ ] Integration with banking APIs
- [ ] Educational video content
- [ ] Achievement system and badges

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues, feature requests, or pull requests.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Code Style
- Use meaningful variable names
- Comment complex logic
- Follow existing code structure
- Test across multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports

If you encounter any bugs or issues, please [open an issue](https://github.com/yourusername/money-master/issues) with:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 🏆 Acknowledgments

- Icons and emojis for visual appeal
- Financial literacy resources for educational content
- Open source community for inspiration and best practices
- Beta testers for valuable feedback

## 📞 Support

For support and questions:
- 📧 Email: jamalortiz37@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/yohjamal/Akiba/issues)
- 📚 Documentation: [Wiki](https://github.com/yohjamal/Akiba/wiki)

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

---

<div align="center">

**Made with ❤️ for financial education**

*Empowering families to build better financial futures*

</div>