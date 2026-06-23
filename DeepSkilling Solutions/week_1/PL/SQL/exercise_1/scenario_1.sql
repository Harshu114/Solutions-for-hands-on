-- =====================================================
-- EXERCISE 1 - SCENARIO 1
-- Apply 1% interest discount for customers above age 60
-- =====================================================

DELIMITER //

CREATE PROCEDURE ApplySeniorDiscount()
BEGIN
    DECLARE finished INT DEFAULT 0;
    DECLARE cid INT;
    DECLARE cage INT;

    DECLARE customer_cursor CURSOR FOR
    SELECT customer_id, age
    FROM Customers;

    DECLARE CONTINUE HANDLER
    FOR NOT FOUND SET finished = 1;

    OPEN customer_cursor;

    read_loop: LOOP
        FETCH customer_cursor
        INTO cid,cage;

        IF finished = 1 THEN
            LEAVE read_loop;
        END IF;

        IF cage > 60 THEN
            UPDATE Loans
            SET interest_rate = interest_rate - 1
            WHERE customer_id = cid;
        END IF;

    END LOOP;

    CLOSE customer_cursor;
END //

DELIMITER ;

-- =====================================================
-- TESTING OUTPUT FOR SCENARIO 1
-- =====================================================

CALL ApplySeniorDiscount();

SELECT * FROM Loans;
