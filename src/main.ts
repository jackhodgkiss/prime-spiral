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

document.addEventListener("DOMContentLoaded", () => {
    for(let prime_number of generate_prime_numbers()) {
        if(prime_number > 1000) { break; }
        console.log(prime_number);
    }
});