// Home.jsx - Landing page component

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Intelligent Financial Planning with AI</h1>
          <p className="hero-subtitle">
            Plan smarter, save more, and reach your financial goals with our AI-powered financial advisor
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">Get Started</Link>
                <Link to="/login" className="btn btn-secondary">Log In</Link>
              </>
            )}
          </div>
        </div>
        <div className="hero-image">
          <div className="image-placeholder">Financial Planning Illustration</div>
        </div>
      </header>

      <section className="features-section">
        <h2 className="section-title">Smart Financial Planning</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3 className="feature-title">Budget Tracking</h3>
            <p className="feature-description">
              Easily track your income and expenses with smart categorization and alerts.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3 className="feature-title">AI-Powered Insights</h3>
            <p className="feature-description">
              Get personalized financial insights using advanced machine learning algorithms.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3 className="feature-title">Investment Recommendations</h3>
            <p className="feature-description">
              Receive tailored investment advice based on your risk tolerance and goals.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3 className="feature-title">Goal Planning</h3>
            <p className="feature-description">
              Set financial goals and track your progress with smart milestones.
            </p>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3 className="step-title">Connect Your Accounts</h3>
            <p className="step-description">
              Securely connect your financial accounts to get a complete picture of your finances.
            </p>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <h3 className="step-title">Set Your Goals</h3>
            <p className="step-description">
              Define what you want to achieve, whether it's saving for a home, retirement, or education.
            </p>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <h3 className="step-title">Get AI Recommendations</h3>
            <p className="step-description">
              Our AI analyzes your financial data and provides personalized recommendations.
            </p>
          </div>

          <div className="step">
            <div className="step-number">4</div>
            <h3 className="step-title">Track Your Progress</h3>
            <p className="step-description">
              Monitor your progress and adjust your strategy based on real-time insights.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              "This app completely changed how I manage my finances. The AI recommendations are spot on!"
            </div>
            <div className="testimonial-author">- Sarah K.</div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              "I've saved over $5,000 in just 6 months by following the personalized savings plan."
            </div>
            <div className="testimonial-author">- Michael T.</div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              "The investment advice helped me diversify my portfolio and increase my returns significantly."
            </div>
            <div className="testimonial-author">- Jennifer L.</div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">Ready to achieve your financial goals?</h2>
          <p className="cta-description">
            Join thousands of users who have already transformed their financial future.
          </p>
          {!isAuthenticated && (
            <Link to="/signup" className="btn btn-primary btn-large">Get Started for Free</Link>
          )}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">FinAI Advisor</div>
          <div className="footer-links">
            <a href="#">About Us</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Contact</a>
          </div>
          <div className="footer-copyright">
            &copy; {new Date().getFullYear()} FinAI Advisor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

// Additional CSS for the Home page
const styles = `
.home-page {
  padding-top: 0;
}

.hero-section {
  display: flex;
  align-items: center;
  min-height: 90vh;
  background: linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%);
  padding: 80px 40px;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.btn-large {
  padding: 15px 30px;
  font-size: 1.1rem;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-placeholder {
  width: 500px;
  height: 400px;
  background-color: rgba(25, 118, 210, 0.1);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--primary-color);
  font-weight: 500;
  box-shadow: var(--shadow-medium);
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--primary-dark);
}

.features-section {
  padding: 80px 40px;
  background-color: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background-color: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--shadow-light);
  transition: transform 0.3s, box-shadow 0.3s;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-medium);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-dark);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

.how-it-works {
  padding: 80px 40px;
  background-color: var(--background-main);
}

.steps {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  flex-wrap: wrap;
}

.step {
  flex: 1;
  min-width: 220px;
  margin: 20px;
  text-align: center;
}

.step-number {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 auto 1.5rem;
}

.step-title {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--primary-dark);
}

.step-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

.testimonials {
  padding: 80px 40px;
  background-color: white;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background-color: var(--background-main);
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--shadow-light);
}

.testimonial-content {
  font-size: 1.1rem;
  font-style: italic;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  line-height: 1.6;
}

.testimonial-author {
  text-align: right;
  font-weight: 500;
  color: var(--primary-color);
}

.cta-section {
  padding: 80px 40px;
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
  color: white;
  text-align: center;
}

.cta-content {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.cta-description {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.footer {
  background-color: var(--background-dark);
  color: white;
  padding: 60px 40px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--primary-light);
}

.footer-links {
  display: flex;
  gap: 20px;
  margin-bottom: 2rem;
}

.footer-links a {
  color: white;
  opacity: 0.7;
  transition: opacity 0.3s;
}

.footer-links a:hover {
  opacity: 1;
}

.footer-copyright {
  opacity: 0.5;
}

@media (max-width: 992px) {
  .hero-section {
    flex-direction: column;
    text-align: center;
    padding: 60px 20px;
  }
  
  .hero-content {
    max-width: 100%;
    margin-bottom: 3rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-buttons {
    justify-content: center;
  }
  
  .image-placeholder {
    width: 100%;
    max-width: 400px;
    height: 300px;
  }
  
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .features-section,
  .how-it-works,
  .testimonials,
  .cta-section {
    padding: 60px 20px;
  }
  
  .steps {
    flex-direction: column;
  }
  
  .step {
    margin: 10px 0;
  }
  
  .cta-title {
    font-size: 2rem;
  }
}
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default Home;