import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateAccountMutation } from '../../authentication';

export function SignUpPage() {
  const [createAccount, { error }] = useCreateAccountMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const submitForm = async () => {
    if (!email || !password) return;
    await createAccount({ email, password });

    if (!error) navigate('/profile');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Sign Up</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          onChange={e => setEmail(e.target.value)}
          placeholder=""
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          placeholder=""
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button onClick={submitForm}>Login</button>
      </div>
    </div>
  );
}
