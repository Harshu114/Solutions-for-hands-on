-- =====================================================
-- BANK DATABASE SETUP
-- Exercise 1 + Exercise 3
-- =====================================================

CREATE DATABASE IF NOT EXISTS bank;

USE bank;

-- =====================================================
-- DROP OLD TABLES
-- =====================================================

DROP TABLE IF EXISTS Loans;
DROP TABLE IF EXISTS Accounts;
DROP TABLE IF EXISTS Customers;

-- =====================================================
-- CREATE CUSTOMERS TABLE
-- =====================================================

CREATE TABLE Customers
(
    customer_id INT PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    balance DECIMAL(10,2),
    IsVIP BOOLEAN DEFAULT FALSE
);

-- =====================================================
-- CREATE LOANS TABLE
-- =====================================================

CREATE TABLE Loans
(
    loan_id INT PRIMARY KEY,
    customer_id INT,
    due_date DATE,
    interest_rate DECIMAL(5,2),

    FOREIGN KEY(customer_id)
    REFERENCES Customers(customer_id)
);

-- =====================================================
-- CREATE ACCOUNTS TABLE
-- =====================================================

CREATE TABLE Accounts
(
    account_id INT PRIMARY KEY,
    customer_id INT,
    balance DECIMAL(10,2),
    account_type VARCHAR(20),

    FOREIGN KEY(customer_id)
    REFERENCES Customers(customer_id)
);

-- =====================================================
-- INSERT SAMPLE DATA
-- =====================================================

INSERT INTO Customers VALUES
(1,'Rahul',65,15000,FALSE),
(2,'Amit',45,8000,FALSE),
(3,'Priya',70,20000,FALSE),
(4,'Neha',25,12000,FALSE);

INSERT INTO Loans VALUES
(101,1,'2026-07-05',8.5),
(102,2,'2026-08-20',7.5),
(103,3,'2026-06-30',9.0);

INSERT INTO Accounts VALUES
(201,1,50000,'SAVINGS'),
(202,2,15000,'CURRENT'),
(203,3,30000,'SAVINGS'),
(204,4,10000,'SAVINGS');
