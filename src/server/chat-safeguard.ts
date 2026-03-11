type SafeguardResult = {
  violation: 0 | 1
  category:
    | 'Direct Override'
    | 'System Exposure'
    | 'Role Manipulation'
    | 'Instruction Bypass'
    | null
  rationale: string
}

const HIGH_RISK_PATTERNS: Array<{
  category: Exclude<SafeguardResult['category'], null>
  rationale: string
  regex: RegExp
}> = [
  {
    category: 'Direct Override',
    rationale:
      'Detected an explicit request to ignore or override prior instructions.',
    regex:
      /\b(ignore|disregard|bypass)\b.{0,40}\b(previous|prior|system|safety|instructions?)\b/i,
  },
  {
    category: 'System Exposure',
    rationale:
      'Detected an attempt to reveal internal prompts, hidden rules, or system instructions.',
    regex:
      /\b(system prompt|hidden prompt|internal instructions?|developer message|print.*prompt)\b/i,
  },
  {
    category: 'Role Manipulation',
    rationale:
      'Detected role-manipulation wording intended to change assistant constraints.',
    regex: /\b(act as|pretend to be|you are now|roleplay)\b/i,
  },
  {
    category: 'Instruction Bypass',
    rationale:
      'Detected language suggesting jailbreak or safety bypass techniques.',
    regex:
      /\b(jailbreak|prompt injection|bypass safety|override guardrails?)\b/i,
  },
  {
    category: 'Instruction Bypass',
    rationale:
      'Detected obfuscation indicators often used to hide malicious instructions.',
    regex: /\b(base64|rot13|hex decode|decode this|encoded payload)\b/i,
  },
]

const LOW_RISK_SAFE_PATTERNS = [
  /\bwhat are your limitations\b/i,
  /\bwhat can you help with\b/i,
  /\bhow do i use\b/i,
  /\bcan you help me\b/i,
]

export function classifyPromptInjectionAttempt(input: string): SafeguardResult {
  const trimmed = input.trim()
  if (!trimmed) {
    return {
      violation: 0,
      category: null,
      rationale: 'Empty input does not indicate prompt injection.',
    }
  }

  if (LOW_RISK_SAFE_PATTERNS.some((pattern) => pattern.test(trimmed))) {
    return {
      violation: 0,
      category: null,
      rationale:
        'Input appears to be a legitimate capability or usage question.',
    }
  }

  for (const rule of HIGH_RISK_PATTERNS) {
    if (rule.regex.test(trimmed)) {
      return {
        violation: 1,
        category: rule.category,
        rationale: rule.rationale,
      }
    }
  }

  return {
    violation: 0,
    category: null,
    rationale:
      'No clear attempt to manipulate system instructions was detected.',
  }
}
