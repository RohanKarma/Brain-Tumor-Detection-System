import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // NEW
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // NEW
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }
        
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                name,
                email,
                password
            });
            
            if (response.data.success) {
                alert('✅ Signup successful! Please login with your credentials.');
                navigate('/login');
            }
        } catch (err) {
            console.error('Signup error:', err);
            const errorMessage = err.response?.data?.message || 'An error occurred during signup';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#1C1C27'
        },
        card: {
            background: '#27293d',
            padding: '40px',
            borderRadius: '20px',
            width: '400px',
            maxWidth: '90%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
        },
        title: {
            color: 'white',
            textAlign: 'center',
            marginBottom: '30px',
            fontSize: '28px'
        },
        form: {
            display: 'flex',
            flexDirection: 'column'
        },
        input: {
            width: '100%',
            padding: '12px',
            marginBottom: '15px',
            border: '2px solid #373737',
            borderRadius: '8px',
            background: '#1C1C27',
            color: 'white',
            fontSize: '16px',
            boxSizing: 'border-box'
        },
        passwordContainer: {
            position: 'relative',
            marginBottom: '15px'
        },
        passwordInput: {
            width: '100%',
            padding: '12px',
            paddingRight: '45px',
            border: '2px solid #373737',
            borderRadius: '8px',
            background: '#1C1C27',
            color: 'white',
            fontSize: '16px',
            boxSizing: 'border-box'
        },
        eyeButton: {
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            padding: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        button: {
            width: '100%',
            padding: '14px',
            background: '#854CE6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.6 : 1
        },
        link: {
            textAlign: 'center',
            color: 'white',
            marginTop: '20px',
            fontSize: '14px'
        },
        error: {
            color: '#ff4444',
            textAlign: 'center',
            marginBottom: '10px',
            fontSize: '14px',
            padding: '10px',
            background: 'rgba(255, 68, 68, 0.1)',
            borderRadius: '6px'
        },
        linkText: {
            color: '#854CE6',
            textDecoration: 'none',
            cursor: 'pointer',
            fontWeight: '600'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Sign Up </h2>
                <form style={styles.form} onSubmit={handleSubmit}>
                    <input
                        style={styles.input}
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        style={styles.input}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    {/* Password with Show/Hide */}
                    <div style={styles.passwordContainer}>
                        <input
                            style={styles.passwordInput}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password (min 6 characters)"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength="6"
                        />
                        <button
                            type="button"
                            style={styles.eyeButton}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    
                    {/* Confirm Password with Show/Hide */}
                    <div style={styles.passwordContainer}>
                        <input
                            style={styles.passwordInput}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            style={styles.eyeButton}
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                        </button>
                    </div>
                    
                    {error && <div style={styles.error}>{error}</div>}
                    <button style={styles.button} type="submit" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>
                <p style={styles.link}>
                    Already have an account?{' '}
                    <Link to="/login" style={styles.linkText}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;