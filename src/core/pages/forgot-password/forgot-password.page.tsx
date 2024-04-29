import { useState } from 'react';
import { useLazyResetPasswordQuery } from '../../../@shared/clients';

export function ForgotPasswordPage() {
  const [resetPassword, { error, isSuccess }] = useLazyResetPasswordQuery();

  const [email, setEmail] = useState<string | null>(null);

  const submitForm = async () => {
    await resetPassword({ email });
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      <div>
        <label>Email</label>
        <input
          type="email"
          placeholder=""
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button onClick={submitForm}>Reset Password</button>
      </div>

      {isSuccess ? <div>Check your email for a reset link</div> : <>{error}</>}
    </div>
  );
}
