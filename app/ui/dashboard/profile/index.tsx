"use client";

import { JwtPayload } from "jsonwebtoken";
import React from "react";

const Profile = ({ user }: JwtPayload) => {
  return (
    <main>
      <div className="container">{JSON.stringify(user)}</div>
    </main>
  );
};

export default Profile;
