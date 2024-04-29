import { useState } from 'react';
import { useUpdateUserMutation } from '../../../@shared/clients';

export function ResetPasswordPage() {
  const [updateUser, { error, isSuccess }] = useUpdateUserMutation();

  const [password, setPassword] = useState<string | null>(null);

  const submitForm = async () => {
    if (!password) return;
    await updateUser({ password });
  };

  return (
    <div>
      <h1>Update Password</h1>
      <div>
        <label>password</label>
        <input
          type="password"
          placeholder=""
          onChange={e => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button disabled={!password} onClick={submitForm}>
          Update Password
        </button>
      </div>

      {isSuccess ? <div>Password updated</div> : <>{error}</>}
    </div>
  );
}
