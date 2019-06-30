import React from 'react';
import { Link, RouteComponentProps } from '@reach/router';
import ProfileArticles from './ProfileArticles';
import FollowUserButton from './common/FollowUserButton';
import { IProfile } from '../types';
import useAuth from '../context/auth';
import { unfollowProfile, followProfile, getProfile } from '../api/ProfileAPI';
import { ALT_IMAGE_URL } from '../utils';

export default function Profile({
  username = '',
}: RouteComponentProps<{ username: string }>) {
  const [profile, setProfile] = React.useState<IProfile | null>(null);
  const [loading, setLoading] = React.useState(false);
  const {
    state: { user },
  } = useAuth();

  React.useEffect(() => {
    let ignore = false;

    async function fetchProfile() {
      try {
        const payload = await getProfile(username);
        if (!ignore) {
          setProfile(payload.data.profile);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchProfile();
    return () => {
      ignore = true;
    };
  }, [username]);

  const handleClick = async () => {
    if (!profile) return;
    let payload;
    setLoading(true);
    try {
      if (profile.following) {
        payload = await unfollowProfile(profile.username);
      } else {
        payload = await followProfile(profile.username);
      }
      setProfile(payload.data.profile);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const isUser = profile && user && profile.username === user.username;

  return (
    profile && (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img
                  src={profile.image || ALT_IMAGE_URL}
                  className="user-img"
                  alt={profile.username}
                />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                {isUser ? (
                  <EditProfileSettings />
                ) : (
                  <FollowUserButton
                    profile={profile}
                    onClick={handleClick}
                    loading={loading}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ProfileArticles username={username} />
      </div>
    )
  );
}

function EditProfileSettings() {
  return (
    <Link
      to="/settings"
      className="btn btn-sm btn-outline-secondary action-btn"
    >
      <i className="ion-gear-a"></i> Edit Profile Settings
    </Link>
  );
}
