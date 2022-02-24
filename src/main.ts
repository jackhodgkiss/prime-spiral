function* generate_prime_numbers(): Generator<number> {
    let potential_prime: number = 2;
    if(potential_prime == 2) { yield 2; }
    if(potential_prime % 2 == 0) { potential_prime += 1; }
    while(true) {
        let is_prime: Boolean = true;
        for (let counter = 3; counter < Math.sqrt(potential_prime); counter += 2) {
            if(potential_prime % counter == 0) { is_prime = false; break; }
        }
        if(is_prime) { yield potential_prime; }
        potential_prime += 2;
    }
}

function* generate_prime_numbers_until(generator: () => any, limit: number) : Generator<number> {
    for(let prime_number of generator()) {
        if(prime_number > limit) { break; }
        yield prime_number;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    for(let prime_number of generate_prime_numbers_until(generate_prime_numbers, 100)) {
        console.log(prime_number);
    }
});