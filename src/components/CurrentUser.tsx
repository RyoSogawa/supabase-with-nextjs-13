'use client';

import React from 'react';

import Link from 'next/link';

import useGetUser from '../hooks/useGetUser';

const CurrentUser: React.FC = () => {
  const { user, error } = useGetUser();

  if (error) {
    console.error(error);
    return <div>error</div>;
  }

  const username = user?.user_metadata.username;

  return username ? (
    <Link href="profile">{username}</Link>
  ) : (
    <>
      <Link href="/signin">signin</Link>
      <Link href="/signup">signup</Link>
    </>
  );
};

export default CurrentUser;
