<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    public function definition(): array
    {
        return [
            Company::COLUMN_NAME => $this->faker->company(),
            Company::COLUMN_WEBSITE => $this->faker->url(),
            Company::COLUMN_EMAIL => $this->faker->companyEmail(),
            Company::COLUMN_PHONE => $this->faker->phoneNumber(),
            Company::COLUMN_ADDRESS => $this->faker->address(),
            Company::COLUMN_DESCRIPTION => $this->faker->paragraph(),
            Company::COLUMN_APPLIED_ON => $this->faker->date(),
            Company::COLUMN_APPLIED_STATUS => $this->faker->randomElement([
                Company::APPLIED_STATUS_PENDING,
                Company::APPLIED_STATUS_INTERESTED,
                Company::APPLIED_STATUS_APPLIED,
                Company::APPLIED_STATUS_INTERVIEWING,
                Company::APPLIED_STATUS_OFFERED,
                Company::APPLIED_STATUS_REJECTED,
            ]),
            Company::COLUMN_APPLIED_POSITION => $this->faker->jobTitle(),
            Company::COLUMN_APPLIED_VIA => $this->faker->randomElement(['LinkedIn', 'Website', 'Email', 'Referral', 'Job Portal']),
        ];
    }
}
