-- =====================================================
-- EXERCISE 1 - SCENARIO 3
-- Loan reminders within next 30 days
-- =====================================================

DELIMITER //

CREATE PROCEDURE LoanReminders()
BEGIN
    SELECT
        c.name,
        l.loan_id,
        l.due_date,
        CONCAT(
            'Reminder: Loan ',
            l.loan_id,
            ' is due on ',
            l.due_date
        ) AS Message
    FROM Customers c
    JOIN Loans l
    ON c.customer_id=l.customer_id
    WHERE l.due_date
    BETWEEN CURDATE()
    AND DATE_ADD(CURDATE(),INTERVAL 30 DAY);
END //

DELIMITER ;

-- =====================================================
-- TESTING OUTPUT FOR SCENARIO 3
-- =====================================================

CALL LoanReminders();
