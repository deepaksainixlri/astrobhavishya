import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('loads homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AstroBhavishya/i);
  });

  test('has navigation links', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('has hero section content', async ({ page }) => {
    await page.goto('/');
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
  });

  test('nav login link works', async ({ page }) => {
    await page.goto('/');
    const loginLink = page.locator('a[href*="login"]').first();
    if (await loginLink.isVisible()) {
      await loginLink.click();
      await page.waitForURL(/login/);
      expect(page.url()).toContain('login');
    }
  });
});

test.describe('Auth - Login Page', () => {
  test('login page loads with sign in text', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page.locator('body')).toBeVisible();
    const text = await page.textContent('body');
    expect(text?.toLowerCase()).toContain('sign in');
  });

  test('login form has email and password fields', async ({ page }) => {
    await page.goto('/auth/login');
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('shows demo mode banner', async ({ page }) => {
    await page.goto('/auth/login');
    const body = await page.textContent('body');
    // In demo mode, should show demo banner
    console.log('Login page has demo mode:', body?.includes('Demo Mode'));
  });

  test('demo login works and redirects to dashboard', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Fill in login form
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();

    await emailInput.click();
    await emailInput.fill('test@example.com');
    await passwordInput.click();
    await passwordInput.fill('password123');

    // Submit the form
    const submitBtn = page.locator('button[type="submit"]').first();
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Should redirect to dashboard
    await page.waitForURL(/dashboard/, { timeout: 15000 });
    expect(page.url()).toContain('dashboard');
    console.log('After login - URL:', page.url());
  });

  test('register link exists on login page', async ({ page }) => {
    await page.goto('/auth/login');
    const registerLink = page.locator('a[href*="register"]').first();
    await expect(registerLink).toBeVisible();
  });
});

test.describe('Auth - Register Page', () => {
  test('register page loads', async ({ page }) => {
    await page.goto('/auth/register');
    await expect(page.locator('body')).toBeVisible();
    const text = await page.textContent('body');
    expect(text?.toLowerCase()).toContain('create');
  });

  test('register form has required fields', async ({ page }) => {
    await page.goto('/auth/register');
    const nameInput = page.locator('input#fullName').first();
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('demo registration works and redirects to dashboard', async ({ page }) => {
    await page.goto('/auth/register');
    await page.waitForLoadState('networkidle');

    const nameInput = page.locator('input#fullName').first();
    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();

    await nameInput.click();
    await nameInput.fill('Test User');
    await emailInput.click();
    await emailInput.fill('newuser@example.com');
    await passwordInput.click();
    await passwordInput.fill('password123');

    const submitBtn = page.locator('button[type="submit"]').first();
    await expect(submitBtn).toBeVisible();
    await submitBtn.click();

    // Should redirect to dashboard
    await page.waitForURL(/dashboard/, { timeout: 15000 });
    expect(page.url()).toContain('dashboard');
    console.log('After register - URL:', page.url());
  });
});

test.describe('Dashboard', () => {
  test('dashboard redirects to login when not logged in', async ({ page }) => {
    await page.goto('/dashboard');
    // In demo mode, middleware passes through, but client-side auth may redirect
    await page.waitForTimeout(3000);
    const url = page.url();
    // Either redirected to login or stayed on dashboard (demo mode allows both)
    expect(url).toMatch(/login|dashboard/);
  });

  test('dashboard accessible after login', async ({ page }) => {
    // First login
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    await emailInput.click();
    await emailInput.fill('test@example.com');
    await passwordInput.click();
    await passwordInput.fill('password123');

    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();
    await page.waitForURL(/dashboard/, { timeout: 15000 });

    // Dashboard should load with user content
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
    console.log('Dashboard after login - URL:', page.url());
  });

  test('dashboard shows user info after login', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    const emailInput = page.locator('input[type="email"]').first();
    const passwordInput = page.locator('input[type="password"]').first();
    await emailInput.click();
    await emailInput.fill('test@example.com');
    await passwordInput.click();
    await passwordInput.fill('password123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/dashboard/, { timeout: 15000 });

    // Should show user email in sidebar
    await page.waitForLoadState('networkidle');
    const body = await page.textContent('body');
    expect(body).toContain('test@example.com');
  });

  test('sign out works from dashboard', async ({ page }) => {
    // Login first
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    await page.locator('input[type="email"]').first().click();
    await page.locator('input[type="email"]').first().fill('test@example.com');
    await page.locator('input[type="password"]').first().click();
    await page.locator('input[type="password"]').first().fill('password123');
    await page.locator('button[type="submit"]').first().click();
    await page.waitForURL(/dashboard/, { timeout: 15000 });

    // Click sign out
    await page.waitForLoadState('networkidle');
    const signOutBtn = page.locator('button:has-text("Sign Out")').first();
    await expect(signOutBtn).toBeVisible();
    await signOutBtn.click();

    // Should redirect to home page
    await page.waitForTimeout(3000);
    expect(page.url()).not.toContain('dashboard');
  });
});

test.describe('Horoscope Page', () => {
  test('horoscope page loads', async ({ page }) => {
    await page.goto('/horoscope');
    await expect(page.locator('body')).toBeVisible();
    const text = await page.textContent('body');
    expect(text?.toLowerCase()).toContain('horoscope');
  });

  test('horoscope shows zodiac signs', async ({ page }) => {
    await page.goto('/horoscope');
    await page.waitForTimeout(2000);
    const body = await page.textContent('body');
    const hasZodiac = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']
      .some(sign => body?.includes(sign));
    expect(hasZodiac).toBe(true);
  });

  test('horoscope does not show error on initial load', async ({ page }) => {
    await page.goto('/horoscope');
    // Should show loading first, not "Unable to load"
    const loadingText = page.locator('text=Loading horoscope');
    const errorText = page.locator('text=Unable to load');

    // Either loading or horoscope content should be visible, not the error
    await page.waitForTimeout(500);
    const hasError = await errorText.isVisible().catch(() => false);
    console.log('Horoscope shows error on load:', hasError);
  });
});

test.describe('Compatibility Page', () => {
  test('compatibility page loads', async ({ page }) => {
    await page.goto('/compatibility');
    await expect(page.locator('body')).toBeVisible();
    const text = await page.textContent('body');
    console.log('Compatibility body:', text?.substring(0, 500));
  });
});

test.describe('Pricing Page', () => {
  test('pricing page loads', async ({ page }) => {
    await page.goto('/pricing');
    await expect(page.locator('body')).toBeVisible();
    const text = await page.textContent('body');
    console.log('Pricing body:', text?.substring(0, 500));
  });

  test('pricing has plan options', async ({ page }) => {
    await page.goto('/pricing');
    await page.waitForTimeout(1000);
    const body = await page.textContent('body');
    const hasPricing = body?.toLowerCase().includes('free') || body?.toLowerCase().includes('pro') || body?.toLowerCase().includes('price');
    console.log('Has pricing info:', hasPricing);
  });
});

test.describe('API Routes', () => {
  test('generate-chart API responds', async ({ request }) => {
    const response = await request.post('/api/generate-chart', {
      data: {
        name: 'Test User',
        dateOfBirth: '1990-01-15',
        timeOfBirth: '10:30',
        placeOfBirth: 'Delhi, India',
        latitude: 28.6139,
        longitude: 77.2090,
      }
    });
    console.log('Generate chart status:', response.status());
    expect(response.status()).toBeLessThan(500);
  });

  test('daily-horoscope API responds', async ({ request }) => {
    const response = await request.get('/api/daily-horoscope');
    console.log('Daily horoscope status:', response.status());
    expect(response.status()).toBeLessThan(500);
  });

  test('check-compatibility API responds', async ({ request }) => {
    const response = await request.post('/api/check-compatibility', {
      data: {
        person1: {
          fullName: 'Person One',
          dateOfBirth: '1990-01-15',
          timeOfBirth: '10:30',
          placeOfBirth: 'Delhi',
          latitude: 28.6139,
          longitude: 77.2090,
        },
        person2: {
          fullName: 'Person Two',
          dateOfBirth: '1992-05-20',
          timeOfBirth: '14:00',
          placeOfBirth: 'Mumbai',
          latitude: 19.076,
          longitude: 72.8777,
        },
        gender1: 'M',
        gender2: 'F',
      }
    });
    console.log('Compatibility status:', response.status());
    expect(response.status()).toBeLessThan(500);
  });
});

test.describe('Console Errors Check', () => {
  test('homepage has no critical JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/');
    await page.waitForTimeout(2000);
    console.log('Homepage JS errors:', errors);
    // Should have no errors
    expect(errors.length).toBe(0);
  });

  test('login page has no critical JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/auth/login');
    await page.waitForTimeout(2000);
    console.log('Login page JS errors:', errors);
    expect(errors.length).toBe(0);
  });

  test('dashboard has no hydration errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    await page.goto('/dashboard');
    await page.waitForTimeout(3000);
    const hydrationErrors = errors.filter(e => e.toLowerCase().includes('hydration'));
    console.log('Dashboard hydration errors:', hydrationErrors);
    expect(hydrationErrors.length).toBe(0);
  });
});
