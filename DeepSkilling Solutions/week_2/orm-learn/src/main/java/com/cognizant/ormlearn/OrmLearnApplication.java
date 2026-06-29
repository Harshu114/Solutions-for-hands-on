package com.cognizant.ormlearn;

import com.cognizant.ormlearn.model.Country;
import com.cognizant.ormlearn.model.Employee;
import com.cognizant.ormlearn.model.Department;
import com.cognizant.ormlearn.model.Skill;
import com.cognizant.ormlearn.service.CountryService;
import com.cognizant.ormlearn.service.EmployeeService;
import com.cognizant.ormlearn.service.DepartmentService;
import com.cognizant.ormlearn.service.SkillService;
import com.cognizant.ormlearn.service.exception.CountryNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import java.util.List;

@SpringBootApplication
public class OrmLearnApplication {

    private static final Logger LOGGER =
        LoggerFactory.getLogger(OrmLearnApplication.class);

    private static CountryService countryService;
    private static EmployeeService employeeService;
    private static DepartmentService departmentService;
    private static SkillService skillService;

    public static void main(String[] args) throws Exception {
        ApplicationContext context =
            SpringApplication.run(OrmLearnApplication.class, args);

        countryService    = context.getBean(CountryService.class);
        employeeService   = context.getBean(EmployeeService.class);
        departmentService = context.getBean(DepartmentService.class);
        skillService      = context.getBean(SkillService.class);

        LOGGER.info("Inside main");

        // 1_spring-data-jpa exercises
        exercise1_QuickExample();
        exercise1_FindCountryByCode();
        exercise1_AddCountry();

        // 2_spring-data-jpa exercises
        exercise2_QueryMethods();

        // 3_spring-data-jpa exercises
        exercise3_HQLQuery();
        exercise3_NativeQuery();

        // 2_spring-data-jpa: O/R Mapping
        exercise2_GetEmployee();
        exercise2_AddEmployee();
        exercise2_GetDepartment();
        exercise2_GetPermanentEmployees();
        exercise2_GetAverageSalary();
    }

    // ===================== 1_spring-data-jpa =====================

    private static void exercise1_QuickExample() {
        LOGGER.info("=== Exercise 1: Quick Example - Get All Countries ===");
        List<Country> countries = countryService.getAllCountries();
        LOGGER.debug("countries={}", countries);
    }

    private static void exercise1_FindCountryByCode()
            throws CountryNotFoundException {
        LOGGER.info("=== Exercise 1: Find Country By Code ===");
        Country country = countryService.findCountryByCode("IN");
        LOGGER.debug("Country:{}", country);
    }

    private static void exercise1_AddCountry()
            throws CountryNotFoundException {
        LOGGER.info("=== Exercise 1: Add New Country ===");
        Country newCountry = new Country();
        newCountry.setCode("XX");
        newCountry.setName("Test Country");
        countryService.addCountry(newCountry);
        Country found = countryService.findCountryByCode("XX");
        LOGGER.debug("Added country:{}", found);
    }

    // ===================== 2_spring-data-jpa =====================

    private static void exercise2_QueryMethods() {
        LOGGER.info("=== Exercise 2: Query Methods ===");
        List<Country> containing = countryService.findByNameContaining("ou");
        LOGGER.debug("Containing 'ou':{}", containing);
        List<Country> startingZ = countryService.findByNameStartingWith("Z");
        LOGGER.debug("Starting with Z:{}", startingZ);
    }

    private static void exercise2_GetEmployee() {
        LOGGER.info("=== Exercise 2: O/R Mapping - Get Employee ===");
        Employee employee = employeeService.get(1);
        LOGGER.debug("Employee:{}", employee);
        LOGGER.debug("Department:{}", employee.getDepartment());
        LOGGER.debug("Skills:{}", employee.getSkillList());
    }

    private static void exercise2_AddEmployee() {
        LOGGER.info("=== Exercise 2: O/R Mapping - Add Employee ===");
        Employee employee = new Employee();
        employee.setName("David");
        employee.setSalary(65000);
        employee.setPermanent(true);
        Department department = departmentService.get(1);
        employee.setDepartment(department);
        employeeService.save(employee);
        LOGGER.debug("Added Employee:{}", employee);
    }

    private static void exercise2_GetDepartment() {
        LOGGER.info("=== Exercise 2: O/R Mapping - Get Department with Employees ===");
        Department department = departmentService.get(1);
        LOGGER.debug("Department:{}", department);
        LOGGER.debug("Employees:{}", department.getEmployeeList());
    }

    // ===================== 3_spring-data-jpa =====================

    private static void exercise3_HQLQuery() {
        LOGGER.info("=== Exercise 3: HQL Query ===");
        List<Country> results = countryService.searchByNameHQL("Ind");
        LOGGER.debug("HQL results:{}", results);
    }

    private static void exercise3_NativeQuery() {
        LOGGER.info("=== Exercise 3: Native Query ===");
        List<Country> results = countryService.searchByNameNative("Ind");
        LOGGER.debug("Native results:{}", results);
    }

    private static void exercise2_GetPermanentEmployees() {
        LOGGER.info("=== Exercise 3: HQL - Get Permanent Employees ===");
        List<Employee> employees = employeeService.getAllPermanentEmployees();
        LOGGER.debug("Permanent Employees:{}", employees);
        employees.forEach(e -> LOGGER.debug("Skills:{}", e.getSkillList()));
    }

    private static void exercise2_GetAverageSalary() {
        LOGGER.info("=== Exercise 3: HQL - Average Salary ===");
        double avg = employeeService.getAverageSalary(1);
        LOGGER.debug("Average Salary for dept 1:{}", avg);
    }
}
