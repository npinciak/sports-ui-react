import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyLoginWithPasswordQuery } from '../../../@shared/clients';

export function LoginPage() {
  const [login, { isSuccess }] = useLazyLoginWithPasswordQuery();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const submitForm = async () => {
    await login({ email, password });

    if (isSuccess) navigate('/profile');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Login</h1>
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
        <Link to="/forgot-password">Forgot password?</Link>
      </div>

      <div>
        <button onClick={submitForm}>Login</button>
      </div>
    </div>
  );
}
