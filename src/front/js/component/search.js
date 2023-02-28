import React, { Component } from "react";

export const Search = () => (
  
  <search className="input-group rounded p-4" >
    <input
      type="search"
      className="form-control rounded"
      placeholder="Search"
      aria-label="Search"
      aria-describedby="search-addon" 
    />
    <span className="input-group-text border-0" id="search-addon">
      <i className="fas fa-search"></i>
    </span>
      
  </search>
);
