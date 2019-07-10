import React from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import ListErrors from './common/ListErrors';
import useAuth from '../context/auth';
import { updateUser, logout } from '../api/AuthAPI';
import { IErrors } from '../types';

export default function Settings(_: RouteComponentProps) {
  const {
    state: { user },
    dispatch,
  } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<IErrors | null>(null);
  const [form, setForm] = React.useState({
    username: '',
    email: '',
    image: '',
    bio: '',
    password: '',
  });

  React.useEffect(() => {
    if (user) {
      const { username, email, image, bio } = user;
      console.log(username, email, image, bio);
      setForm({
        username,
        email,
        image: image || '',
        bio: bio || '',
        password: '',
      });
    }
  }, [user]);

  const handleChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    setLoading(true);
    if (!form.password) {
      delete form.password;
    }
    try {
      const payload = await updateUser(form);
      dispatch({ type: 'LOAD_USER', user: payload.data.user });
    } catch (error) {
      console.log(error);
      if (error.status === 422) {
        setErrors(error.data.errors);
      }
    }
    setLoading(false);
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    logout();
    navigate('/');
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>
            {errors && <ListErrors errors={errors} />}
            <form onSubmit={handleSubmit}>
              <fieldset>
                <div className="form-group">
                  <input
                    name="image"
                    className="form-control"
                    type="text"
                    placeholder="URL of profile picture"
                    value={form.image}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="username"
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="bio"
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    value={form.bio}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="email"
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    name="password"
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="btn btn-lg btn-primary pull-xs-right"
                  type="submit"
                  disabled={loading}
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
