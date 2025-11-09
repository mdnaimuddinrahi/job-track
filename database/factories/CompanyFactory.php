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
            'name' => $this->faker->company(),
            'website' => $this->faker->url(),
            'email' => $this->faker->companyEmail(),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'description' => $this->faker->paragraph(),
            'applied_on' => $this->faker->date(),
            'applied_status' => $this->faker->randomElement([
                Company::APPLIED_STATUS_PENDING,
                Company::APPLIED_STATUS_INTERESTED,
                Company::APPLIED_STATUS_APPLIED,
                Company::APPLIED_STATUS_INTERVIEWING,
                Company::APPLIED_STATUS_OFFERED,
                Company::APPLIED_STATUS_REJECTED,
            ]),
            'applied_position' => $this->faker->jobTitle(),
            'applied_via' => $this->faker->randomElement(['LinkedIn', 'Website', 'Email', 'Referral', 'Job Portal']),
        ];
    }
}
