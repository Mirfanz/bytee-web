"use client";

import React from "react";
import { Breadcrumbs, Typography } from "@material-tailwind/react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <main>
      <div className="container">
        <Typography placeholder={""} variant="h3">
          Dashboard
        </Typography>
        <Breadcrumbs placeholder={""}>
          <a href="#" className="opacity-60">
            Docs
          </a>
          <a href="#" className="opacity-60">
            Components
          </a>
          <a href="#">Breadcrumbs</a>
        </Breadcrumbs>
      </div>
    </main>
  );
};

export default Dashboard;
