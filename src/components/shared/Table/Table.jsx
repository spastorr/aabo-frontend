import React from 'react';
import styles from './Table.module.css';

const Table = ({ children, className = '', ...props }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={`${styles.table} ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
};

const TableHead = ({ children, className = '', ...props }) => {
  return (
    <thead className={`${styles.tableHead} ${className}`} {...props}>
      {children}
    </thead>
  );
};

const TableBody = ({ children, className = '', ...props }) => {
  return (
    <tbody className={`${styles.tableBody} ${className}`} {...props}>
      {children}
    </tbody>
  );
};

const TableRow = ({ children, className = '', onClick, ...props }) => {
  return (
    <tr 
      className={`${styles.tableRow} ${onClick ? styles.clickableRow : ''} ${className}`} 
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  );
};

const TableHeader = ({ children, className = '', ...props }) => {
  return (
    <th className={`${styles.tableHeader} ${className}`} {...props}>
      {children}
    </th>
  );
};

const TableCell = ({ children, className = '', ...props }) => {
  return (
    <td className={`${styles.tableCell} ${className}`} {...props}>
      {children}
    </td>
  );
};

export { Table, TableHead, TableBody, TableRow, TableHeader, TableCell };