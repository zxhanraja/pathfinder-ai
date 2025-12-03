import React from 'react';
import { PageLayout } from '../PageLayout';

export const PrivacyPolicy: React.FC<{ onBack: () => void, onNavigate: (p: string) => void }> = (props) => {
  return (
    <PageLayout title="Privacy Policy" {...props}>
      <div className="max-w-4xl mx-auto prose prose-invert prose-lg text-slate-300">
        <h3>1. Information We Collect</h3>
        <p>We collect information you provide directly to us, such as your name, career history, skills, and interests when you use our analysis tools.</p>
        
        <h3>2. How We Use Your Data</h3>
        <p>We use your data solely to generate career recommendations. We do not share your personal profile with third-party recruiters without your explicit consent.</p>
        
        <h3>3. AI Processing</h3>
        <p>Your data is processed by our AI models to generate insights. This processing is stateless for the purpose of generation and isn't used to train public models with your personally identifiable information.</p>
        
        <h3>4. Data Security</h3>
        <p>We implement appropriate technical and organizational measures to protect your personal data against unauthorized access.</p>
      </div>
    </PageLayout>
  );
};

export const TermsOfService: React.FC<{ onBack: () => void, onNavigate: (p: string) => void }> = (props) => {
  return (
    <PageLayout title="Terms of Service" {...props}>
       <div className="max-w-4xl mx-auto prose prose-invert prose-lg text-slate-300">
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing PathFinder AI, you agree to be bound by these Terms of Service.</p>
        
        <h3>2. Use of Service</h3>
        <p>PathFinder AI is a career guidance tool. While we strive for accuracy, the career advice provided is for informational purposes only and should not be the sole basis for life-changing financial or career decisions.</p>
        
        <h3>3. User Conduct</h3>
        <p>You agree not to misuse the services or help anyone else do so.</p>
        
        <h3>4. Limitation of Liability</h3>
        <p>PathFinder AI shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits or data.</p>
      </div>
    </PageLayout>
  );
};