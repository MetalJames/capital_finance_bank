import React from 'react';

type ContactItem = {
  label?: string;
  text: string;
  link?: string;
};

type ContactSectionProps = {
  title: string;
  content: string;
  items: ContactItem[];
};

const ContactSection: React.FC<ContactSectionProps> = ({ title, content, items }) => (
  <div style={{ marginBottom: '20px' }}>
    <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{title}</h2>
    <p>{content}</p>
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.link ? (
            <a href={item.link}>{item.text}</a>
          ) : (
            <span><strong>{item.label}:</strong> {item.text}</span>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const contactMethods = {
  customerSupport: {
    title: 'Customer Support',
    content: 'Our customer support team is here to help you with any inquiries or issues you may have. You can contact us via phone or email, or visit one of our branches.',
    items: [
      { label: 'Phone', text: '1-800-123-4567' },
      { label: 'Email', text: 'support@capitalfinancebank.com' }
    ]
  },
  branchLocations: {
    title: 'Branch Locations',
    content: 'Visit us at any of our convenient branch locations for in-person assistance.',
    items: [
      { text: '123 Main Street, Cityville' },
      { text: '456 Elm Street, Townsville' },
      { text: '789 Maple Avenue, Villageville' }
    ]
  },
  onlineSupport: {
    title: 'Online Support',
    content: 'For quick assistance, use our online resources:',
    items: [
      { link: '/faq', text: 'FAQ - Find answers to commonly asked questions.' },
      { link: '/tutorials', text: 'Tutorials - Step-by-step guides to help you navigate our services.' },
      { link: '/support', text: 'Support - Submit a ticket for technical support.' }
    ]
  },
  followUs: {
    title: 'Follow Us',
    content: 'Stay connected with us on social media:',
    items: [
      { link: 'https://www.facebook.com/capitalfinancebank', text: 'Facebook' },
      { link: 'https://www.twitter.com/capitalfinancebank', text: 'Twitter' },
      { link: 'https://www.linkedin.com/company/capitalfinancebank', text: 'LinkedIn' }
    ]
  }
};

const ContactUs: React.FC = () => (
  <div style={{ padding: '20px' }}>
    <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Contact Us</h1>
    {Object.values(contactMethods).map((method, index) => (
      <ContactSection
        key={index}
        title={method.title}
        content={method.content}
        items={method.items}
      />
    ))}
  </div>
);

export default ContactUs;