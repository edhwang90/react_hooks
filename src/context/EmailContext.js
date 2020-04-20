import React, { useEffect, useState, useContext } from 'react';
import { fetchEmails, fetchLatestEmails } from '../FakeAPI';
import { withNotifier } from './NotificationContext';
import { UserContext } from './UserContext';

const EmailContext = React.createContext();

const EmailProvider = (props) => {
  const [emails, setEmails] = useState([]);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setLoading(true);

    fetchEmails()
      .then(emails => {
        setLoading(false);
        setEmails(emails);
      }
      )
      .catch(error => {
        setLoading(false);
        setError(error);
      });
  }, [])

  useEffect(() => {
    const refresh = () => {
      if (!loading) {
        fetchLatestEmails().then(res => {
          if (emails.length > 0) {
            setEmails(emails.concat(res));

            props.notify(
              `${res.length} more emails arrived`
            );
          }
        });
      }
    };

    let refreshInterval = setInterval(refresh, 5000);

    return () => {
      clearInterval(refreshInterval);
    }
  }, [emails]);

  const handleSelectEmail = email => {
    setCurrentEmail(email);
  };

  const initialConfig = {
    emails,
    currentEmail,
    error,
    loading,
    onSelectEmail: handleSelectEmail
  }

  return (
    <EmailContext.Provider value={initialConfig}>
      {props.children}
    </EmailContext.Provider>
  );
}

const Wrapped = withNotifier(EmailProvider);

export {
  Wrapped as EmailProvider,
  EmailContext
};